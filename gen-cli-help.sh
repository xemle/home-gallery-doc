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
$CLI fetch -h > $CLI_FILES/fetch-help.out
$CLI cast -h > $CLI_FILES/cast-help.out

$CLI database remove -h > $CLI_FILES/database-remove-help.out
$CLI storage purge -h > $CLI_FILES/storage-purge-help.out
$CLI export meta -h > $CLI_FILES/export-meta-help.out
$CLI export static -h > $CLI_FILES/export-static-help.out

$CLI plugin -h > $CLI_FILES/plugin-help.out
$CLI plugin ls -h > $CLI_FILES/plugin-ls-help.out
$CLI plugin ls extrator -h > $CLI_FILES/plugin-ls-extractor-help.out
$CLI plugin ls database -h > $CLI_FILES/plugin-ls-database-help.out
$CLI plugin create -h > $CLI_FILES/plugin-create-help.out

cp $GALLERY_HOME/gallery.config-example.yml source/configuration/files
cp $GALLERY_HOME/docker-compose.yml source/install/files
cp $GALLERY_HOME/examples/only-images.exclude source/faq/files
cp $GALLERY_HOME/CHANGELOG.md source/changelog.md

echo "Help and config files are updated"
