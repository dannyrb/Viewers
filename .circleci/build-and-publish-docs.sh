#!/bin/bash

# Set directory to location of this script
# https://stackoverflow.com/a/3355423/1867984
cd "$(dirname "$0")"

yarn -v
node -v

echo 'Installing Gitbook CLI'
yarn global bin
yarn config get prefix
yarn config set prefix ~/.yarn
export PATH="$PATH:`yarn global bin`"
# yarn global add gitbook-cli
# yarn global add gh-pages
# npm i gitbook-cli -g
# npm i gh-pages -g
# yarn list

# export PATH="$(yarn global bin):$PATH"

which gitbook
which gh-pages

echo 'Running Gitbook installation'

# Generate all version's GitBook output
# For each directory in /docs ...
cd ./../docs/
for D in *; do
    if [ -d "${D}" ]; then

			echo "Generating output for: ${D}"
			cd "${D}"

			# Clear previous output, generate new
			rm -rf _book
			gitbook install
			gitbook build

			cd ..

		fi
done

# Move CNAME File into `latest`
cp CNAME ./latest/_book/CNAME

# Create a history folder in our latest version's output
mkdir ./latest/_book/history

# Move each version's files to latest's history folder
for D in *; do
	if [ -d "${D}" ]; then
		if [ "${D}" == v* ] ; then

			echo "Moving ${D} to the latest version's history folder"

			mkdir "./latest/_book/history/${D}"
			cp -v -r "./${D}/_book"/* "./latest/_book/history/${D}"

		fi
	fi
done

# Back to repo root
cd ..

echo "Done generating documentation output"
echo 'PUBLISHING'

git config --global user.email "danny.ri.brown+ohif-bot@gmail.com"
git config --global user.name "ohif-bot"
git config user.email "danny.ri.brown+ohif-bot@gmail.com"
git config user.name "ohif-bot"

./node_modules/.bin/gh-pages \
  --silent \
  --repo https://$GITHUB_TOKEN@github.com/OHIF/Viewers.git \
  --message 'Autogenerated Message: [ci skip]' \
	--dist docs/latest/_book
