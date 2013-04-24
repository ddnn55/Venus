#!/bin/sh

echo "var refs=[\n" > ~/Dropbox/Public/Venus/refs.js

git for-each-ref --format="%(objectname)" refs/tags | \
while read entry
do
        git show $entry:./venus.html > ~/Dropbox/Public/Venus/$entry.html
	echo "  '$entry',\n" >> ~/Dropbox/Public/Venus/refs.js
        #echo $ref
done

echo "];" >> ~/Dropbox/Public/Venus/refs.js

cp index.html ~/Dropbox/Public/Venus/
