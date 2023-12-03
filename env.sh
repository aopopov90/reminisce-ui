#!/bin/bash

# Get the value of the API_URL environment variable
API_URL=${API_URL:-"http://localhost"}

# Create the env-config.js file
cat <<EOL > env-config.js
window._env_ = {
  API_URL: "${API_URL}",
};
EOL

echo "env-config.js generated successfully with API_URL=${API_URL}"
