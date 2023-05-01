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
wget --no-check-certificate --user ${NEXUS_USER}  --password ${NEXUS_USER_PWD} https://nexus.tools.froala-infra.com/repository/Froala-npm/${PACKAGE_NAME}/-/${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz

RUN npm install 

RUN npm run demo.build
EXPOSE 4200
CMD ["npm","run","start"]
