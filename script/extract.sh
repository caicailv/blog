#!/bin/bash
url= "/opt/blog"
# echo "url->$url"
# pm2 stop nest_serivce
echo "删除上次打包文件"
rm -rf "$url/dist"

echo "解压缩文件"
unzip -o "$url/output.zip" -d "$url"
echo "$url/output.zip"
echo "删除压缩包"
rm -rf "$url/output.zip"
