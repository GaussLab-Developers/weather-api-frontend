echo -e "
********************
Removing existing image...
********************
"
docker rmi weatherapi.kr.ncr.ntruss.com/weather-api-fe
echo -e "
********************
Building...
********************
"
docker build -t weatherapi.kr.ncr.ntruss.com/weather-api-fe .
echo -e "
********************
Logging in...
********************
"
docker login weatherapi.kr.ncr.ntruss.com
echo -e "
********************
Pushing...
********************
"
docker push weatherapi.kr.ncr.ntruss.com/weather-api-fe
echo -e "
********************
Done!
********************
"
read a