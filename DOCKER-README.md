# OTTO B2B DESIGN SYSTEM

## About

The B2B Design System is the library of components used to build the Otto Marketplace.
The goal of the B2B Design System is to provide frontend components that encapsulate styles and behaviour for teams to use out of the box.

This image packs the distribution files and main documentation, and can be deployed in any server and run as a static site.

You can find our documentation released in [this link](https://b2b-design-system.otto.market/?path=/docs/overview--docs), and the Design System repository [here](https://github.com/otto-de/b2b-design-system).

## Usage

### Pull docker image

```shell script
docker pull ottoopensource/b2bds-docs:<docker tag>
```

### Start the image locally

```shell script
docker run -it -p 80:80 ottoopensource/b2bds-docs
```
When you open the specified url to the Storybook app currently running, make sure to append `/design-system` to the path to access the docs.
