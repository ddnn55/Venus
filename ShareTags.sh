#!/bin/sh

echo "var refs=[\n" > ~/Dropbox/Public/Venus/refs.js

git for-each-ref --format="%(objectname)" refs/tags | \
while read entry
do
        mkdir -p ~/Dropbox/Public/Venus/$entry
        git archive $entry | tar -x -C ~/Dropbox/Public/Venus/$entry
        rm ~/Dropbox/Public/Venus/$entry/index.html

	    echo "  '$entry',\n" >> ~/Dropbox/Public/Venus/refs.js
        #echo $ref
done

echo "];" >> ~/Dropbox/Public/Venus/refs.js

cp index.html ~/Dropbox/Public/Venus/