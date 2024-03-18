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
  machine_type = "e2-custom-2-4096"
  zone                = "us-east1-b"
  image_name          = "dev-centos-8-${formatdate("YYYY-MM-DD-hh-mm-ss", timestamp())}"
  image_description   = "CSYE6225 image creation practice"
  ssh_username        = "adityamysore002"
}

build {
  sources = ["source.googlecompute.packer-image-creation"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/"

  }

  provisioner "file" {

    source      = "webapp.service"
    destination = "/tmp/"

  }

  provisioner "file" {
    source = "logconfig.yaml"
    destination = "/tmp/"
  }

  provisioner "shell" {
    script = "initial_setup.sh"
  }


  provisioner "shell" {
    script = "install_node.sh"
  }

  provisioner "shell" {
    script = "install_server.sh"
  }
}