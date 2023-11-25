FROM nginx:alpine

# Copy all except folders and files starting with dot
COPY . /usr/share/nginx/html

