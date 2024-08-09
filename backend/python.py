# import sys
# from google_images_download import google_images_download
# import os
# import zipfile

# def download_images():
#     response = google_images_download.googleimagesdownload()
#     arguments = {"keywords": "apple", "limit": 5, "print_urls": True, "format": "jpg"}
#     paths = response.download(arguments)
#     print(paths)
#     return paths

# def zip_images(image_paths, zip_path):
#     with zipfile.ZipFile(zip_path, 'w') as zipf:
#         for folder_name, subfolders, filenames in os.walk(image_paths):
#             for filename in filenames:
#                 file_path = os.path.join(folder_name, filename)
#                 zipf.write(file_path, os.path.relpath(file_path, image_paths))

# if __name__ == "_main_":
#     keyword = sys.argv[1]
#     num_images = int(sys.argv[2])
# image_paths = download_images()
# zip_path = f"{keyword.replace(' ', '_')}.zip"
# zip_images(list(image_paths.values())[0][0], zip_path)
# print("Image downloaded succesfully")
# print(os.path.abspath(zip_path))




# import sys
# from google_images_download import google_images_download
# import os
# import zipfile

# def download_images(keywords, num_images=20):
#     response = google_images_download.googleimagesdownload()
#     arguments = {"keywords": keywords, "limit": num_images, "print_urls": False, "format": "jpg"}
#     paths = response.download(arguments)
#     return paths

# def zip_images(image_paths, zip_path):
#     with zipfile.ZipFile(zip_path, 'w') as zipf:
#         for folder_name, subfolders, filenames in os.walk(image_paths):
#             for filename in filenames:
#                 file_path = os.path.join(folder_name, filename)
#                 zipf.write(file_path, os.path.relpath(file_path, image_paths))

# if __name__ == "_main_":
#     keyword = sys.argv[1]
#     num_images = int(sys.argv[2])
#     image_paths = download_images(keyword, num_images)
#     zip_path = f"{keyword.replace(' ', '_')}.zip"
#     zip_images(list(image_paths.values())[0][0], zip_path)
#     abs_zip_path = os.path.abspath(zip_path)
#     print(abs_zip_path)
#     print("Image downloaded successfully")

# import sys
# from google_images_download import google_images_download
# import os
# import zipfile

# def download_images(keywords, num_images=1):
#     response = google_images_download.googleimagesdownload()
#     arguments = {"keywords": keywords, "limit": num_images, "print_urls": False, "format": "jpg"}
#     paths = response.download(arguments)
#     return paths

# def zip_images(image_paths, zip_path):
#     with zipfile.ZipFile(zip_path, 'w') as zipf:
#         for folder_name, subfolders, filenames in os.walk(image_paths):
#             for filename in filenames:
#                 file_path = os.path.join(folder_name, filename)
#                 zipf.write(file_path, os.path.relpath(file_path, image_paths))

# if __name__ == "__main__":
#     keyword = "flower"
#     num_images = 1
#     image_paths = download_images(keyword, num_images)
    
#     # Check if paths returned is as expected
#     if not image_paths or keyword not in image_paths:
#         print("No images downloaded.")
#     else:
#         first_image_path = list(image_paths[keyword])[0]  # Get the path of the first image
#         zip_path = f"{keyword.replace(' ', '_')}.zip"
#         zip_images(first_image_path, zip_path)
        
#         print(f"Image downloaded and zipped successfully.")
#         print(f"Absolute path of the ZIP file: {os.path.abspath(zip_path)}")


import sys
import requests
import os
import re
from bs4 import BeautifulSoup
from io import BytesIO
from zipfile import ZipFile

def download_images(keyword, num_images):
    search_url = f"https://www.bing.com/images/search?q={keyword}&form=HDRSC2&first=1&tsc=ImageHoverTitle"
    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    images = []
    for img_tag in soup.find_all('img', {'src': re.compile(r'^https://')}):
        if len(images) >= num_images:
            break
        image_url = img_tag['src']
        images.append(image_url)

    image_data = []
    for img_url in images:
        img_response = requests.get(img_url)
        image_data.append(BytesIO(img_response.content))

    return image_data

def zip_images(image_data, zip_path):
    with ZipFile(zip_path, 'w') as zipf:
        for i, image in enumerate(image_data):
            zipf.writestr(f"image_{i+1}.jpg", image.read())

def main():
    keyword = sys.argv[1]
    num_images = int(sys.argv[2])

    image_data = download_images(keyword, num_images)
    zip_path = f"{keyword.replace(' ', '_')}.zip"
    zip_images(image_data, zip_path)

    abs_zip_path = os.path.abspath(zip_path)
    print(abs_zip_path)
    print("Images downloaded and sent successfully.")

if _name_ == "_main_":
    main()
