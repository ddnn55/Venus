#!/bin/sh

#target_dir=~/Dropbox/Public/Venus
target_dir=gh-pages

mkdir -p $target_dir
echo "var refs=[\n" > $target_dir/refs.js

git for-each-ref --format="%(objectname)" refs/tags | \
while read entry
do
        mkdir -p $target_dir/$entry
        git archive $entry | tar -x -C $target_dir/$entry

        rm $target_dir/$entry/index.html
        rm $target_dir/$entry/ShareTags.sh
        rm $target_dir/$entry/README.md
        rm $target_dir/$entry/.gitignore
        rm $target_dir/$entry/Box2D.js

	    echo "  '$entry',\n" >> $target_dir/refs.js
        #echo $ref
done

echo "];" >> $target_dir/refs.js

cp index.html $target_dir/