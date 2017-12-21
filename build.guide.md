# 创建单元测试工程

首先需要安装Node环境，安装完成后，来创建测试工程。

## 工程目录结构


工程结构确定后，需要新建一个package.json。打开cmd

## 创建package.json

在根目录下执行

```
npm init
```

根据提示输入对应信息（也可以使用回车跳过，之后再配置）

创建完成后，继续安装15.6.2版本的React。

## 安装React（15.6.2）

在根目录下执行

```
npm i --save react@15.6.2 react-dom@15.6.2
```

## 安装官方测试工具react-test-renderer@15.6.2"

在根目录下执行

```
npm i --save-dev react-test-renderer@15.6.2
```

接下来安装Enzyme，它的API模仿jQuery操作Dom的方式，便于记忆，用起来灵活。

因为选择了15.6.2版本的react环境，需要安装enzyme-adapter-react-15进行兼容（如果选择其他版本的react，请点击[React兼容性](http://airbnb.io/enzyme/docs/installation/)按照官方文档进行兼容性配置）。

## 安装Enzyme
    
在根目录下执行

```
npm i --save-dev enzyme enzyme-adapter-react-15
```

接下来安装断言库Chai，它是一个支持BDD，TDD格式的断言库。用它进行测试断言的编写。

## 安装Chai

在根目录下执行

```
npm i --save-dev chai
```

现在可以编写第一个测试用例了Hello Test，测试下面的内容：

* 一个待测试的数组，[1,2,3]
* 使用Array.prototype.indexOf检查4在数组中的索引。返回值必须为-1


## Hello Test

在test文件夹中创建hello.test.js，将下方代码添加到文件中：

```
var assert = require('assert');

describe('#Test Array.prototype.indexOf', function() {
  it('should return -1 when the value is not present', function() {
    assert.equal(-1, [1,2,3].indexOf(4));
  });
});
```

现在需要一个测试框架运行测试。我们选择mocha，它是一个简单，灵活的框架。也是目前使用率最多的几个测试框架之一。可以在浏览器和Node.js环境中运行。

## 安装Mocha

在根目录下执行
```
npm i --save-dev mocha
```

安装完成后，在package.json中配置test脚本指令

## 配置test脚本命令

打开package.json；

找到"scripts"字段，将test指令修改成：

```
"test": "mocha"
```

现在可以运行测试了

## 运行Hello Test

打开cmd，在根目录运行

```
npm test
```

结果如图：

![hello-test-run-result.png](https://github.com/liuxian496/keep/blob/developer/img/hello-test-run-result.png)

第一个单元测试运行成功了，下面尝试对React组件进行测试。

首先，创建Apple组件：

## 创建Apple.js

在src文件夹中创建Apple.js，将下方代码添加到文件中：

```
import React, { Component } from 'react';

class Apple extends Component {
    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        );
    }
}

export default Apple;
```

其次，创建App组件

## 创建App.js

在src文件夹中创建App.js，将下方代码添加到文件中：
```
import React, { Component } from 'react';
import Apple from './Apple.js'

class App extends Component {

    componentDidMount(){
    }

    render() {
        return (
            <div>
            <span>appd</span>
            <Apple />
            </div>
        );
    }
}

export default App;
```

最后，创建测试用例React Test，测试下面的内容：
* 在组件<App />中，如果<Apple />组件的个数是1，则<Apple />组件初始化成功。

## 创建react.dest.js 

在test文件夹中创建react.test.js，将下方代码添加到文件中：
```
import React from 'react';
import ReactDOM from 'react-dom';

import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import App from '../src/App';
import Apple from '../src/Apple';

var assert = require('assert');

describe('<App />', () => {
    it('Apple without crashing in shallow mode.', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Apple)).to.have.length(1);
    });
});
```

在根目录下运行

```
npm test
```
会出现异常信息，如图：

![need-babel.png](https://github.com/liuxian496/keep/blob/developer/img/need-babel.png)

import是ES6特性，如果没有被编译就会出现图中的异常。现在需要引入babel配合mocha完成编译工作。

## 安装babel-register

在根目录下执行

```
npm i --save-dev babel-register
```

打开package.js，将test指令修改成：
```
"test": "mocha --require babel-register"
```

## 安装babel

在根目录下执行

```
npm i --save-dev babel-cli babel-preset-env babel-preset-react
```


在根目录下，创建.babelrc文件,将下方代码添加到文件中：
```
{
    "presets": [
        "env",
        "react"
    ]
}
```

在根目录下执行
```
npm test
```

会看到新的异常信息，如图：

![need-enzyme-adapter.png](https://github.com/liuxian496/keep/blob/developer/img/need-enzyme-adapter.png)

接下来，对enzyme adapter进行配置

## 创建mocha.opts.js

在test文件夹下创建，mocha.opts.js，将下方代码添加到文件中：

```
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });
```

打开package.js，将test指令修改成：
```

"test":"mocha --require babel-register --require ./test/mocha.opts.js"
```

在根目录执行

```
npm test
```

测试成功，如图：

![successed.png](https://github.com/liuxian496/keep/blob/developer/img/successed.png)

mocha默认使用SPEC reporter进行输出，在测试用例比较多时，查看比较困难。我们来更换一种输出模式

## 使用 NYAN reporter

打开package.js，将test指令修改成：
```
"mocha --require babel-register --require ./test/mocha.opts.js --reporter nyan"

```

如图：

![nyna.png](https://github.com/liuxian496/keep/blob/developer/img/nyna.png)

## Shallow Rendering

在react.test.js中，我们使用了Shallow渲染模式。这种模式只渲染“一层深”的组件，之后使用断言对虚拟DOM进行测试，由于不渲染子组件，不会被子组件的行为干扰。这种模式的优点是，不生成实际DOM，不需要DOM环境，处理速度极快。

当需要测试组件之间的交互时，就需要使用Full DOM Rendering模式了。

## Full DOM Rendering

在test文件夹中创建mount.test.js，将下方代码添加到文件中：
```
import React from 'react';
import ReactDOM from 'react-dom';

import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';

import App from '../src/App';

var assert = require('assert');

describe('<App />', () => {
    it('App componentDidMount is called with error.', function () {
        sinon.spy(App.prototype, 'componentDidMount');
        const wrapper = mount(<App />);
        expect(App.prototype.componentDidMount.callCount).to.be.equal(1);
    });
});
```

这里使用sinon库，对componentDidMount的调用进行计数。

## 安装sinon

在根目录下执行

```
npm i --save-dev sinon
```

安装完毕后，在根目录执行

```
npm test
```

会出现异常：**Error: It looks like you called `mount()` without a global document being loaded.**

使用mount需要在全局范围内提供完整的DOM API。这意味着它必须在至少“看起来像”浏览器环境的环境中运行。我们选择jsdom库，生成一个无头浏览器作为运行载体。

## 安装jsdom

在根目录运行
```
npm i --save-dev jsdom
```

继续安装jsdom-global，使用它把document, window 和 DOM API注入到Node.js环境。

## 安装jsdom-global

在根目录运行
```
npm i --save-dev jsdom-global
```

打开test文件夹下的mocha.opts.js，引入jsdom-global，代码如下:
```
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import 'jsdom-global/register';
//require('jsdom-global')();
```

在根目录下执行

```
npm test
```

成功运行，如图：
![mount-successed.png](https://github.com/liuxian496/keep/blob/developer/img/mount-successed.png)

## 简化import

每个测试都要引入react，enzyme，chai比较繁琐。把它们抽取到mocha.opts.js中，就能避免每个文件都重新引入

打开mocha.opts.js，修改为：

```
import React from 'react';
import ReactDOM from 'react-dom';

import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { expect } from 'chai';
import sinon from 'sinon';

import 'jsdom-global/register';
//require('jsdom-global')();

global.React = React;
global.ReactDOM = ReactDOM;
global.expect = expect;
global.sinon = sinon;
global.shallow = shallow;
global.mount = mount;
```

之后将测试文件中多余的import去掉。


下面我们来配置karma，它能帮助我们在真实浏览器环境运行测试。为了能再任何地方运行karm，需要在全局安装karma-cli

## 安装karma-cli

在根目录下执行

```
npm install -g karma-cli
```

## 安装karma和karma-mocha

在根目录下执行

```
npm i --save-dev karma karma-mocha
```

我们使用Chrome运行测试，需要安装karma-chrome-launcher

## 安装karma-chrome-launcher

```
npm i --save-dev karma-chrome-launcher
```


接下来创建karma config文件

## 创建karma config文件

在根目录下创建karma.conf.js文件，添加代码如下：

```
module.exports = function(config) {
    config.set({
      basePath: '',
  
      frameworks: ['mocha'],
  
      files: [
        'test/*.js',
      ],
  
      exclude: [
          //配置文件中有jsdom，因此exclude
         'test/mocha.opts.js',
      ],
  
      preprocessors: {
      },

      plugins: [
        'karma-chrome-launcher',
        'karma-mocha'
      ],
      
      reporters: ['progress'],
  
      port: 9876,
  
      colors: true,
  
      logLevel: config.LOG_INFO,
  
      autoWatch: true,
  
      browsers: ['Chrome'],
  
      singleRun: false,
  
      concurrency: Infinity
    })
  }
```
在根目录下执行

```
karma start 
```

点击浏览器右上方的debug，点击F12，之后查看console，如图：
![need-webpack.png](https://github.com/liuxian496/keep/blob/master/img/need-webpack.png)

因为没有对文件编译，chrome不能识别require和import语法。我们引入webpack，解决这个问题。与webpack结合使用也是karma的一个优势，能更好的对实际项目进行测试。我们先来安装webpack。

## 安装webpack

在根目录执行

```
npm i --save-dev webpack
```

使用babel-loader对文件编写，我们来安装它。

## 安装babel-loader

在根目录运行

```
npm i --save-dev babel-loader
```

karma使用webpack需要引入karma-webpack。

## 安装karma-webpack

在根目录下执行

```
npm i --save-dev karma-webpack
```

打开karma.conf.js，配置webpack和preprocessors：

```
module.exports = function(config) {
    config.set({
    ...
      preprocessors: {
        'test/*.js': ['webpack']
      },

      webpack: {
        module: {
          loaders: [
            {
              test: /\.js$/,
              //使用babel-loader进行编译
              exclude:/(node_modules)/,
              loader: 'babel-loader',
            },
          ],
        },
      },

      plugins: [
        'karma-chrome-launcher',
        'karma-mocha',
        'karma-webpack',
      ],
    ...
    })
  }
```

保存后，在根目录下执行

```
karma start
```

点击浏览器右上方的debug，点击F12，之后查看console，如图：
![need-new-mocha-config.png](https://github.com/liuxian496/keep/blob/master/img/need-new-mocha-config.png)

为了简化测试编写，我们将测试文件依赖的公共模块移动到mocha.opts.js，由于文件中包含jsdom，我们屏蔽了它。所以出现上方的异常，我们需要一个新的配置来解决这个异常。

## 创建mocha.karma.opts.js

在test文件夹下创建mocha.karma.opts.js，添加如下代码：

```
import React from 'react';
import ReactDOM from 'react-dom';

import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { expect } from 'chai';
import sinon from 'sinon';

global.React = React;
global.ReactDOM = ReactDOM;
global.expect = expect;
global.sinon = sinon;
global.shallow = shallow;
global.mount = mount;
```

出来jsdom，代码与mocha.opts.js一致。这样在编译时，就会在全局环境（window）注入需要的模块。

为了方便在浏览器中查看测试结果，我们添加一个html reporter。

打开karma.conf.js，配置client：

```
module.exports = function(config) {
    config.set({
    ...
      client: {
        mocha: {
          reporter: 'html'
        }
      },
    ...
    })
  }
```

在根目录下运行

```
karma start
```

点击浏览器右上方的debug，查看debug页面，如图：
![karma-successed.png](https://github.com/liuxian496/keep/blob/master/img/arma-successed.png)
