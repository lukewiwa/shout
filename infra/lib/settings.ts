export const getEnv = (envVar: string) => {
    const env = process.env[envVar];
    if (!env) throw new Error(`No environment variable found for ${envVar}`);
    return env;
};

export const FULLY_QUALIFIED_DOMAIN = getEnv("FULLY_QUALIFIED_DOMAIN");
