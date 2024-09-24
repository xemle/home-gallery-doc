Use Traefik proxy with subpath
------------------------------

Demonstrate how to use HomeGallery with docker compose and http proxy traefik with base path `/pictures`

File `config.conf`: 

.. code-block:: yaml
    :linenos:

    http:
      routers:
        gallery:
          rule: "PathPrefix(`/pictures`)"
          service: gallery
      services:
        gallery:
          loadBalancer:
            servers:
              - url: "http://gallery:3000"


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
          # Define server prefix
          - GALLERY_PREFIX=/pictures
        volumes:
          - ./data:/data
          # Mount your media directories below /data
          - ${HOME}/Pictures:/data/Pictures    
        user: "${CURRENT_USER}"
        entrypoint: ['node', '/app/gallery.js']
        command: ['run', 'server']  

      traefik:
        image: traefik
        command:
          - "--entryPoints.web.address=:8080"
          - "--providers.file.filename=/etc/config.yml"
        ports:
          - "8080:8080"
        volumes:
          - ./config.yml:/etc/config.yml

Start

.. code-block:: bash
    :linenos:

    mkdir -p data/config
    echo "CURRENT_USER=$(id -u):$(id -g)" >> .env
    docker compose run gallery run init --source /data/Pictures
    docker compose up -d

Open `localhost:8080/pictures <http://localhost:8080/pictures>`_ in your browser    