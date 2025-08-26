import pandas as pd
import numpy as np
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import StandardScaler

movies = pd.read_csv("../ml-latest-small/movies.csv")
ratings = pd.read_csv("../ml-latest-small/ratings.csv")

#user-item matrix
user_item_matrix = ratings.merge(movies, on="movieId").pivot_table(index='userId', columns='title', values='rating')
user_item_filled = user_item_matrix.fillna(0)

scaler = StandardScaler()
user_item_scaled = scaler.fit_transform(user_item_filled)

#SVD
svd = TruncatedSVD(n_components=50, random_state=42)
user_factors = svd.fit_transform(user_item_filled)
item_factors = svd.components_
predicted_matrix = np.dot(user_factors, item_factors)
predicted_df = pd.DataFrame(predicted_matrix, index=user_item_filled.index, columns=user_item_filled.columns)


def recommend_from_ratings(user_ratings_dict, top_k=10):

    print("Received user ratings:", user_ratings_dict)

    new_user_vector = pd.Series(0, index=user_item_matrix.columns, dtype=float)

    for title, rating in user_ratings_dict.items():
        if title in new_user_vector.index:
            new_user_vector[title] = rating

    extended_matrix = user_item_matrix.copy()
    extended_matrix.loc[-1] = new_user_vector
    extended_matrix_filled = extended_matrix.fillna(0)

    svd = TruncatedSVD(n_components=50, random_state=42)
    user_factors = svd.fit_transform(extended_matrix_filled)
    item_factors = svd.components_
    predicted_matrix = np.dot(user_factors, item_factors)

    predictions = pd.Series(predicted_matrix[-1], index=user_item_matrix.columns)

    predictions = predictions.drop(labels=user_ratings_dict.keys(), errors="ignore")

    predictions = predictions.fillna(0)
    top_recs = predictions.sort_values(ascending=False).head(top_k).to_dict()

    print("Top recommendations:", top_recs)
    return top_recs



def normalize_title(title):
    title = title.lower()
    if ", the" in title:
        title = "the " + title.replace(", the", "")
    elif ", a" in title:
        title = "a " + title.replace(", a", "")
    elif ", an" in title:
        title = "an " + title.replace(", an", "")
    return title.strip()


def get_closest_titles(query, top_n=5):
    query = query.lower()
    normalized_titles = {normalize_title(title): title for title in predicted_df.columns}
    matches = [original for norm, original in normalized_titles.items() if query in norm]
    return matches[:top_n]
