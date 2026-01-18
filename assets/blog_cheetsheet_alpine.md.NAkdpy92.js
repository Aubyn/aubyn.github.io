import{l as a,c as i,b as n,aj as l}from"./chunks/framework.CZoYd-ur.js";const o=JSON.parse('{"title":"alpine","description":"","frontmatter":{},"headers":[],"relativePath":"blog/cheetsheet/alpine.md","filePath":"blog/cheetsheet/alpine.md"}'),e={name:"blog/cheetsheet/alpine.md"};function p(t,s,h,k,r,d){return n(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="alpine" tabindex="-1">alpine <a class="header-anchor" href="#alpine" aria-label="Permalink to &quot;alpine&quot;">​</a></h1><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看已安装的软件包</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> info</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -vv</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动 ssh 服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/usr/sbin/sshd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 结束 ssh 服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">killall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sshd</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/usr/sbin/sshd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 结束 ssh 服务</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">kill</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pidof</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sshd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/usr/sbin/sshd</span></span></code></pre></div>`,2)])])}const g=a(e,[["render",p]]);export{o as __pageData,g as default};
