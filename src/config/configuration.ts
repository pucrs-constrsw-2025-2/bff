export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  enableSwagger: process.env.ENABLE_SWAGGER !== 'false',

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // OAuth/OIDC
  oauth: {
    issuer: process.env.OAUTH_ISSUER || 'http://localhost:8180',
    clientId: process.env.OAUTH_CLIENT_ID || 'bff',
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    tokenEndpoint: process.env.OAUTH_TOKEN_ENDPOINT || '/api/v1/login',
    jwksUri: process.env.OAUTH_JWKS_URI || '/.well-known/jwks.json',
    audience: process.env.OAUTH_AUDIENCE,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },

  // Microservices
  services: {
    oauth: {
      baseUrl: process.env.OAUTH_INTERNAL_HOST
        ? `http://${process.env.OAUTH_INTERNAL_HOST}:${process.env.OAUTH_INTERNAL_API_PORT || 8000}`
        : 'http://localhost:8180',
      timeout: parseInt(process.env.OAUTH_TIMEOUT || '5000', 10),
    },
    employees: {
      baseUrl: process.env.EMPLOYEES_INTERNAL_HOST
        ? `http://${process.env.EMPLOYEES_INTERNAL_HOST}:${process.env.EMPLOYEES_INTERNAL_API_PORT || 8080}`
        : 'http://localhost:8181',
      timeout: parseInt(process.env.EMPLOYEES_TIMEOUT || '5000', 10),
    },
    students: {
      baseUrl: process.env.STUDENTS_INTERNAL_HOST
        ? `http://${process.env.STUDENTS_INTERNAL_HOST}:${process.env.STUDENTS_INTERNAL_API_PORT || 8080}`
        : 'http://localhost:8189',
      timeout: parseInt(process.env.STUDENTS_TIMEOUT || '5000', 10),
    },
    professors: {
      baseUrl: process.env.PROFESSORS_INTERNAL_HOST
        ? `http://${process.env.PROFESSORS_INTERNAL_HOST}:${process.env.PROFESSORS_INTERNAL_API_PORT || 8082}`
        : 'http://localhost:8185',
      timeout: parseInt(process.env.PROFESSORS_TIMEOUT || '5000', 10),
    },
    courses: {
      baseUrl: process.env.COURSES_INTERNAL_HOST
        ? `http://${process.env.COURSES_INTERNAL_HOST}:${process.env.COURSES_INTERNAL_API_PORT || 8080}`
        : 'http://localhost:8183',
      timeout: parseInt(process.env.COURSES_TIMEOUT || '5000', 10),
    },
    classes: {
      baseUrl: process.env.CLASSES_INTERNAL_HOST
        ? `http://${process.env.CLASSES_INTERNAL_HOST}:${process.env.CLASSES_INTERNAL_API_PORT || 8080}`
        : 'http://localhost:8182',
      timeout: parseInt(process.env.CLASSES_TIMEOUT || '5000', 10),
    },
    lessons: {
      baseUrl: process.env.LESSONS_INTERNAL_HOST
        ? `http://${process.env.LESSONS_INTERNAL_HOST}:${process.env.LESSONS_INTERNAL_API_PORT || 3000}`
        : 'http://localhost:8184',
      timeout: parseInt(process.env.LESSONS_TIMEOUT || '5000', 10),
    },
    reservations: {
      baseUrl: process.env.RESERVATIONS_INTERNAL_HOST
        ? `http://${process.env.RESERVATIONS_INTERNAL_HOST}:${process.env.RESERVATIONS_INTERNAL_API_PORT || 8080}`
        : 'http://localhost:8186',
      timeout: parseInt(process.env.RESERVATIONS_TIMEOUT || '5000', 10),
    },
    resources: {
      baseUrl: process.env.RESOURCES_INTERNAL_HOST
        ? `http://${process.env.RESOURCES_INTERNAL_HOST}:${process.env.RESOURCES_INTERNAL_API_PORT || 3000}`
        : 'http://localhost:8187',
      timeout: parseInt(process.env.RESOURCES_TIMEOUT || '5000', 10),
    },
    rooms: {
      baseUrl: process.env.ROOMS_INTERNAL_HOST
        ? `http://${process.env.ROOMS_INTERNAL_HOST}:${process.env.ROOMS_INTERNAL_API_PORT || 3000}`
        : 'http://localhost:8188',
      timeout: parseInt(process.env.ROOMS_TIMEOUT || '5000', 10),
    },
  },

  // Cache
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '300', 10),
    max: parseInt(process.env.CACHE_MAX || '100', 10),
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },

  // Rate limiting
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT || '100', 10),
  },

  // HTTP
  http: {
    timeout: parseInt(process.env.HTTP_TIMEOUT || '5000', 10),
  },

  // Circuit breaker
  circuitBreaker: {
    timeout: parseInt(process.env.CIRCUIT_BREAKER_TIMEOUT || '3000', 10),
    errorThresholdPercentage: parseInt(
      process.env.CIRCUIT_BREAKER_ERROR_THRESHOLD || '50',
      10,
    ),
    resetTimeout: parseInt(process.env.CIRCUIT_BREAKER_RESET_TIMEOUT || '30000', 10),
  },

  // Request timeout
  requestTimeout: parseInt(process.env.REQUEST_TIMEOUT || '10000', 10),
});

