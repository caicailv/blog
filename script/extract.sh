#!/bin/bash
url= "/home/nest-backend"
# echo "url->$url"
# pm2 stop nest_serivce
echo "删除上次打包文件"
rm -rf "$url/dist"
rm -rf "$url/package.json"

echo "解压缩文件"
unzip -o "$url/output.zip" -d "$url"
echo "$url/output.zip"
echo "删除压缩包"
rm -rf "$url/output.zip"

# echo "移动文件"

# mv "/home/nestjs-backend/package.json" "/home/nestjs-backend/dist"

echo "重启服务"

pm2 start nest_serivce