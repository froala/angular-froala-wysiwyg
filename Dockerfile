FROM node:14

LABEL maintainer="froala_git_travis_bot@idera.com"

ARG PackageName
ARG PackageVersion
ARG NexusUser
ARG NexusPassword

COPY . /app
WORKDIR /app/

RUN apt update -y \
    && apt install -y jq unzip wget 
RUN echo "Dummy line"

RUN echo "PackageName=$PackageName PackageVersion=$PackageVersion NexusUser=${NexusUser} NexusPassword=${NexusPassword}"
RUN wget --no-check-certificate --user ${NexusUser}  --password ${NexusPassword} https://nexus.tools.froala-infra.com/repository/Froala-npm/${PackageName}/-/${PackageName}-${PackageVersion}.tgz

RUN npm install 

RUN npm run demo.build
EXPOSE 4200
CMD ["npm","run","start"]
