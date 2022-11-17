import{_ as a,c as t,o as r,ae as o}from"./chunks/framework.ibkhFgNr.js";const b=JSON.parse('{"title":"环境变量","description":"","frontmatter":{},"headers":[],"relativePath":"blog/linux/environment_var.md","filePath":"blog/linux/environment_var.md","lastUpdated":1743925298000}'),l={name:"blog/linux/environment_var.md"};function n(i,e,s,h,c,d){return r(),t("div",null,e[0]||(e[0]=[o('<h1 id="环境变量" tabindex="-1">环境变量 <a class="header-anchor" href="#环境变量" aria-label="Permalink to &quot;环境变量&quot;">​</a></h1><h2 id="是什么" tabindex="-1">是什么 <a class="header-anchor" href="#是什么" aria-label="Permalink to &quot;是什么&quot;">​</a></h2><p>环境变量指定了系统运行环境的一些全局配置，包含系统环境变量、用户环境变量、Shell 环境变量和自定义环境变量等。</p><p>其中 PATH 变量，存放了多个可执行文件所在目录，便于直接调用其中的可执行文件。</p><h2 id="为什么" tabindex="-1">为什么 <a class="header-anchor" href="#为什么" aria-label="Permalink to &quot;为什么&quot;">​</a></h2><p>环境变量便于用户和程序找到系统配置、可执行文件、常用数据等。</p><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><ul><li><code>/etc/environment</code>：全用户生效，系统启动时加载，键值对形式（较简单），不建议使用</li><li><code>/etc/profile</code>：全用户生效，登录时加载，bash 脚本，不建议使用</li><li><code>/etc/bash.bashrc</code>：全用户生效，启动 bash 时加载，bash 脚本，建议</li><li><code>~/.bashrc</code>：当前用户生效，启动 bash 时加载，bash 脚本，建议</li></ul><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://senzyo.net/2021-6/" target="_blank" rel="noreferrer">https://senzyo.net/2021-6/</a></li></ul>',10)]))}const u=a(l,[["render",n]]);export{b as __pageData,u as default};
