import infoVids from "./infoVids"

const repositories = {
    videos: infoVids
}

export const RepositoryFactory = {
    get: name => repositories[name],
    getVideo: name => repositories[name]
}