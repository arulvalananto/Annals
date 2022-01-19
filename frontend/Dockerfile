# To run this file, use the following commands:
# To Build -> "docker build -t [name] ."
# To Run -> "docker run -d --name react-app annals-front"
# To check current'y running imags -> "docker images ls"
# To remove image -> "docker image rm [image-id]"

FROM node:16.13.1-alpine3.14
WORKDIR /app
COPY package*.json .
RUN npm install --log-level=warn
COPY . .

ENV REACT_APP_API_URL=http://localhost:5000/api/v1
ENV REACT_APP_ENV=development
ENV REACT_APP_GOOGLE_CLIENT_ID=739522406840-fsiuuc6kg4rdu9sgr8bftju62sfgomhl.apps.googleusercontent.com

EXPOSE 3000

CMD [ "npm", "start" ]
ENTRYPOINT [ "npm", "start" ]
