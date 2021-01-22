

export const routes = {
    article: {
        value: '/article/:articleId',
        get(id) {
            return `/article/${id}`;
        },
    },
    default: {
        value: '/404',
        get() {
            return '/404';
        },
    },
    home: {
        value: '/',
        get() {
            return '/';
        },
    },
    newArticle: {
        value: '/new-article',
        get() {
            return '/new-article';
        },
    },
};