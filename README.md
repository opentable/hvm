# hvm

A host file manager: Create and switch between hosts files from the terminal

## Usage

```
➜  ~  hvm -h

hvm

  Switch between host entries

Usage:
  hvm            list all host entries
  hvm [name]     change hvm profile
  hvm -c [name]  create new hvm profile called name
  hvm -h         print manual

```

### List available host files

```
➜  ~  hvm 
Available profiles:

  ci
  preprod
* prod

```

### Create a new host file

```
➜  ~  sudo hvm -c newprofile
create new hvm profile called newprofile

```


### Switch to a specific host file 

```
➜  ~  sudo hvm ci
Password:
change hvm profile to ci

```

## Contact

* [Arca Artem](https://github.com/arcaartem)
* [Tom Martin](http://github.com/tpgmartin)