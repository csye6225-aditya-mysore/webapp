packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1"
    }
  }
}

source "googlecompute" "packer-image-creation" {
  project_id          = "dev-aditya-mysore"
  source_image_family = "centos-stream-8"
  zone                = "us-east1-b"
  image_name          = "dev-centos-8-${formatdate("YYYY-MM-DD-hh-mm-ss", timestamp())}"
  image_description   = "CSYE6225 image creation practice"
  ssh_username        = "adityamysore002"
  
}

build {
  sources = ["source.googlecompute.packer-image-creation"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/home/adityamysore002/"

  }

  provisioner "file" {

    source      = "webapp.service"
    destination = "/home/adityamysore002/"

  }

  provisioner "shell" {
    script = "initial_setup.sh"
  }

  provisioner "shell" {
    script = "install_db.sh"
  }

  provisioner "shell" {
    script = "install_node.sh"
  }

  provisioner "shell" {
    script = "install_server.sh"
  }
}