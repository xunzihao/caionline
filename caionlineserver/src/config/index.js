export const DB_URL = 'mongodb://localhost:30000/caionline';

export const defaultSchemaExtend = {
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
};

export const defaultSchemaOptions = {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
};

export const jwtConfig = {
    secret: 'myjwtsecret'
};
