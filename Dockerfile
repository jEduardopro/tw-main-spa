FROM node:14.15 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install @angular/cli @angular-devkit/build-angular

COPY package*.json ./
# COPY package-lock.json ${WORK_DIR}

RUN npm install && npm cache clean --force

COPY .  .

EXPOSE 4200

CMD ["npm", "run", "start"]

# WORKDIR /dist/src/app

# COPY package*.json ./

# RUN npm install @angular/cli && npm install

# EXPOSE 8300
# # EXPOSE 4200

# # CMD ["npm", "start"]

# ########### PROD ###########
# # Run command in Virtual directory
# RUN npm cache clean --force
# # Copy files from local machine to virtual directory in docker image
# COPY . .
# RUN npm install
# RUN npm run build --prod


# ### STAGE 2:RUN ###
# # Defining nginx image to be used
# FROM nginx:latest AS ngi
# # Copying compiled code and nginx config to different folder
# # NOTE: This path may change according to your project's output folder 
# COPY --from=build /dist/src/app/dist/twitter-clone /usr/share/nginx/html
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# ######## PROD ############
