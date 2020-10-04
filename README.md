# chrome-extension

If you are working on this project via Upwork, see also our [Upwork Rules of Engagement](https://github.com/filetrust/Open-Source/blob/master/upwork/rules-of-engagement.md)


If you are newcomer, then please check [Glasswall newcomers checklist ](https://github.com/filetrust/Open-Source )

## Project Brief
Objective: Create a chrome-extension that intercepts browser upload/downloads and processes those files with the glasswall rebuild engine for cleaner and safer files 


* Here is the recommended workflow for this project:

  * Create a chrome-extension framework
  * Intercept upload/downloads of files on other browser tabs
  * Send thos files for sanitization to the glasswall rebuild engine
  * Upload/Download the rebuilt files to the user browser

## High Level Architecture

<br><img src="./img/chrome-extension.png" alt="Architecture" width="650"/><br>

## Look and Feel

This is how it looks when added to Chrome

<br><img src="./img/in_action.png" alt="Architecture" width="650"/><br>


## Build Backend Docker Image

A docker image is created for the backend server responsible for the manual upload to make the process easier for testing, As you need to install node on your host to test.

You need only docker installed.

Clone the repo 
```
$ git clone https://github.com/k8-proxy/chrome-extension 
```
Change your current directory
```
$ cd chrome-extension/test/server

```
Build the docker container
```
$ docker build repo-name/name:tag . 

```

run the container
```
$ docker run -p 8080:8080 repo-name/name:tag

```

You will find the application running on port 8080

## Coding Guideline

These are the coding guidelines we tend to follow for Python projects at Glasswall

- [Code Formatting](#code-format)
- [Naming Conventions](#naming-conventions)
- [General](#general)

<a id="code-format"></a>
## Code Formatting

* Align formatting of code using common sense

* Parameter formatting (Readable and easy to find issues if any)

<br><img src="./img/code_formatting.png" alt="Example Formatting" width="650"/><br>

* Code lengths should be based on code readability (for example in the case below)

```
	CONST PARTNERED = 'We have partenered with multiple clients to look out '\
    
                       'for opportunities to get more clientelle'
```

 It is better to put all of that in one line

```
	CONST PARTNERED = 'We have partenered with multiple clients to look out for opportunities to get more clientelle'
```


<a id="naming-conventions"></a>
## Naming Conventions

* Keep separate classes in separate files

* Class names to follow upper camel case (class names should have underscores between words)
e.g
```
	class Http_Api_Issues:
```

* File names should match the class name. E.g. Above file to be saved as “Http_Api_Issues.py”

* Function names to follow lower camel case e.g

e.g.
```
def get_all_issues():
```

* We don’t follow any standards e.g. PEP. Code readability and easy to understand and debug are must.

E.g. Compare a more readable code

```
CONST_STACKOVERFLOW            = 'stackoverflow'
CONST_GLASSWALL                = 'glasswall'
CONST_GW_PROXY                 = 'gw-proxy'
```

With a lesser readable one

```
CONST_STACKOVERFLOW='stackoverflow'
CONST_GLASSWALL='glasswall'
CONST_GW_PROXY='gw-proxy'
```

* Put CONST (when used) on separate python, json or yaml files


![Constants](./img/consts.png)



<a id="general"></a>
## General

* Commit often and with clear commit messages

* You can use whatever font size or face you want, as long as that setting is not pushed to the main repo 

* Align formatting of code using common sense

