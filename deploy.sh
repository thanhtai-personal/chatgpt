cd ~/working/defi/others/web-app &&
rm -rf build && yarn build:bsc &&
mv build/index.html build/index2.html &&
sudo scp -rp -i ~/.ssh/test_new ./build/* root@154.26.135.45:/root/web-app/build &&
mv build/index2.html build/index.html &&
sudo scp -rp -i ~/.ssh/test_new ./build/index.html root@154.26.135.45:/root/web-app/build

