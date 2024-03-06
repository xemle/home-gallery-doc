Other systems
-------------

Quickstart using Azure Container Instance (ACI)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run with Azure CloudShell:

.. code-block:: bash
    :linenos:

    # vars
    ACI_PERS_RESOURCE_GROUP=HomeGalleryRG01
    ACI_PERS_STORAGE_ACCOUNT_NAME=mystorageaccount123
    ACI_PERS_LOCATION=eastus
    ACI_PERS_SHARE_NAME=acishare
    
    # create storage
    az storage account create --resource-group $ACI_PERS_RESOURCE_GROUP --name $ACI_PERS_STORAGE_ACCOUNT_NAME --location $ACI_PERS_LOCATION --sku Standard_LRS
    # create share
    az storage share create --name $ACI_PERS_SHARE_NAME --account-name $ACI_PERS_STORAGE_ACCOUNT_NAME
    # var for storage key
    STORAGE_KEY=$(az storage account keys list --resource-group $ACI_PERS_RESOURCE_GROUP --account-name $ACI_PERS_STORAGE_ACCOUNT_NAME --query "[0].value" --output tsv)
    
    # create container and mapping of the share
    az container create \
        --resource-group $ACI_PERS_RESOURCE_GROUP \
        --name homegallery-01 \
        --image xemle/home-gallery  \
        --dns-name-label homegallery-01 \
        --ports 3000 \
        --command-line "node /app/gallery.js run server" \
        --azure-file-volume-account-name $ACI_PERS_STORAGE_ACCOUNT_NAME \
        --azure-file-volume-account-key $STORAGE_KEY \
        --azure-file-volume-share-name $ACI_PERS_SHARE_NAME \
        --azure-file-volume-mount-path /data

In Azure, use the share within the resource group to create ``/data/Pictures``, as well as ``/data/config/gallery.config.yml``

Use the ``acishare`` to upload images.