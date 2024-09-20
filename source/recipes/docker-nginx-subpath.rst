Use Nginx proxy with subpath
----------------------------

Demonstrate how to use HomeGallery with docker compose and http proxy nginx with base path `/pictures`

File `nginx.conf`: 

.. code-block::
    :linenos:

    server {
        location / {
            root /var/www/html;
        }

        location = /pictures {
            rewrite ^ /pictures/;
        }

        location /pictures/ {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_pass http://gallery:3000/;
        }
    }

File `compose.yml`: 

.. code-block:: yaml
    :linenos:

    services:
      gallery:
        image: xemle/home-gallery
        environment:
          #- GALLERY_API_SERVER=http://api:3000
          - GALLERY_API_SERVER_CONCURRENT=1 # for SoC devices like Rasperry Pi. Use 5 otherwise
          - GALLERY_API_SERVER_TIMEOUT=60 # for SoC devices like Rasperry Pi. Use 30 otherwise
          #- GALLERY_USE_NATIVE=ffprobe,ffmpeg,vipsthumbnail # On issues with sharp resizer
          - GALLERY_OPEN_BROWSER=false
          # Use polling for safety of possible network mounts. Try 0 to use inotify via fs.watch
          - GALLERY_WATCH_POLL_INTERVAL=300
          # Define base path
          - GALLERY_BASE_PATH=/pictures
        volumes:
          - ./data:/data
          # Mount your media directories below /data
          - ${HOME}/Pictures:/data/Pictures    
        user: "${CURRENT_USER}"
        entrypoint: ['node', '/app/gallery.js']
        command: ['run', 'server']  

      nginx:
        image: nginx:1-alpine
        ports:
          - 8080:80
        volumes:
          - ./nginx.conf:/etc/nginx/conf.d/default.conf

Start

.. code-block:: bash
    :linenos:

    mkdir -p data/config
    echo "CURRENT_USER=$(id -u):$(id -g)" >> .env
    docker compose run gallery run init --source /data/Pictures
    docker compose up -d

Open `localhost:8080/pictures <http://localhost:8080/pictures>`_ in your browser    