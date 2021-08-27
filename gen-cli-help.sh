#!/bin/sh

GALLERY_HOME=../home-gallery
CLI=$GALLERY_HOME/gallery.js

for f in cli configuration install faq; do
  mkdir -p source/$f/files
done

CLI_FILES=source/cli/files
$CLI -h > $CLI_FILES/help.out
$CLI run -h > $CLI_FILES/run-help.out
$CLI run init -h > $CLI_FILES/run-init-help.out
$CLI run server -h > $CLI_FILES/run-server-help.out
$CLI run import -h > $CLI_FILES/run-import-help.out
for COMMAND in fetch cast; do
  $CLI $COMMAND -h > $CLI_FILES/$COMMAND-help.out
done


cp $GALLERY_HOME/gallery.config-example.yml source/configuration/files
cp $GALLERY_HOME/docker-compose.yml source/install/files
cp $GALLERY_HOME/examples/only-images.exclude source/faq/files

echo "Help and config files are updated"
