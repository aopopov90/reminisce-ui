# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Get the value of the API_URL environment variable
API_URL=${API_URL:-"http://localhost"}

# Create the env-config.js file in the same directory as the script
cat <<EOL > "${SCRIPT_DIR}/env-config.js"
window._env_ = {
  API_URL: "${API_URL}",
};
EOL

echo "env-config.js generated successfully with API_URL=${API_URL} in ${SCRIPT_DIR}"
