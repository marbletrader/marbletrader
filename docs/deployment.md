# Deploying

Need to streamline this process. Currently, a Docker Compose file can be run like so:

ip - 52.76.168.34

ssh in `ssh -i ~/.ssh/mt-keys ubuntu@52.76.168.34`.

Check Docker Compose file.

`pkill -f docker-compose` to shutdown previous process.

Pull new image if needed `docker pull absurdisms/marbletrader:latest && docker-compose up &`.
