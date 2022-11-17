import{_ as a,c as n,a0 as i,o as l}from"./chunks/framework.D9MR4Zbk.js";const o=JSON.parse('{"title":"窗口管理器","description":"","frontmatter":{},"headers":[],"relativePath":"blog/linux/wm.md","filePath":"blog/linux/wm.md"}'),p={name:"blog/linux/wm.md"};function e(t,s,h,k,r,d){return l(),n("div",null,s[0]||(s[0]=[i(`<h1 id="窗口管理器" tabindex="-1">窗口管理器 <a class="header-anchor" href="#窗口管理器" aria-label="Permalink to &quot;窗口管理器&quot;">​</a></h1><h2 id="how" tabindex="-1">how <a class="header-anchor" href="#how" aria-label="Permalink to &quot;how&quot;">​</a></h2><p>感兴趣的：</p><ul><li>Niri，平铺浮动皆可，默认配置不错</li><li>COSMIC，来自 Pop!_OS，平铺浮动皆可，默认配置不错，简单好用（桌面环境而非窗口管理器）</li><li>Hyprland，圆角、动画、模糊</li><li>Sway，不支持 text-input-v1，部分支持 text-input-v3，不支持 screen tearing（不适合高帧游戏）</li></ul><p>其他：</p><ul><li>fuzzel 启动器不错</li></ul><h2 id="hyprland" tabindex="-1">Hyprland <a class="header-anchor" href="#hyprland" aria-label="Permalink to &quot;Hyprland&quot;">​</a></h2><h3 id="○-安装启动" tabindex="-1">○ 安装启动 <a class="header-anchor" href="#○-安装启动" aria-label="Permalink to &quot;○ 安装启动&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装，补充超时、锁屏、壁纸</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">paru</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hyprland</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> brightnessctl</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 截图工具</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">paru</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hyprland-interactive-screenshot</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 默认配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/hypr/hyprland.conf</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 用户配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.config/hypr/hyprland.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 应用配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hyprctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 手动启动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Hyprland</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 识别 TTY 自动启动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.bashrc</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-z</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$DISPLAY</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ] &amp;&amp; [ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tty</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;/dev/tty1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ]; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">then</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    exec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Hyprland</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fi</span></span></code></pre></div><h3 id="○-配置文件" tabindex="-1">○ 配置文件 <a class="header-anchor" href="#○-配置文件" aria-label="Permalink to &quot;○ 配置文件&quot;">​</a></h3><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 注释下面这行，否则每次启动 Hyprland 都会报警告</span></span>
<span class="line"><span># autogenerated = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 引导键/模式键</span></span>
<span class="line"><span>$mainMod = SUPER</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 屏幕亮度</span></span>
<span class="line"><span>bind = , XF86MonBrightnessUp, exec, brightnessctl s +5%</span></span>
<span class="line"><span>bind = , XF86MonBrightnessDown, exec, brightnessctl s 5%-</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 强制某些窗口浮动</span></span>
<span class="line"><span># rofi 为程序启动器软件</span></span>
<span class="line"><span>windowrulev2 = float, title:rofi.*</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 自启动</span></span>
<span class="line"><span>exec-once=fcitx5 -d</span></span>
<span class="line"><span># 调用 swaybg 设置壁纸</span></span>
<span class="line"><span>exec-once=swaybg -i &quot;path/to/bg.jpg&quot;</span></span></code></pre></div><h2 id="sway-i3wm" tabindex="-1">Sway/i3wm <a class="header-anchor" href="#sway-i3wm" aria-label="Permalink to &quot;Sway/i3wm&quot;">​</a></h2><h3 id="○-安装启动-1" tabindex="-1">○ 安装启动 <a class="header-anchor" href="#○-安装启动-1" aria-label="Permalink to &quot;○ 安装启动&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装，超时、锁屏、壁纸、亮度控制、音量控制</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 archwiki sway，了解各个 deps 的功能</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">paru</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sway</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> swaylock</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> swayidle</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> swaybg</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mako</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> brightnessctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> foot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libpulse</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> polkit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wmenu</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建个人配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.config/sway</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/sway/config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.config/sway/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># chromium 系列，修改启动参数，使其运行于 Wayland</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.config/chrome-flags.conf</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">--enable-features</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">UseOzonePlatform</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">--ozone-platform</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">wayland</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">--enable-wayland-ime</span></span></code></pre></div><h3 id="○-配置文件-1" tabindex="-1">○ 配置文件 <a class="header-anchor" href="#○-配置文件-1" aria-label="Permalink to &quot;○ 配置文件&quot;">​</a></h3><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 终端模拟器，默认 foot</span></span>
<span class="line"><span>set $term qterminal</span></span>
<span class="line"><span># 程序启动器，推荐默认 wmenu</span></span>
<span class="line"><span>set $menu dmenu_path | dmenu | xargs swaymsg exec --</span></span>
<span class="line"><span>set $menu wofi --show drun | xargs swaymsg exec --</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 自启</span></span>
<span class="line"><span>exec_always fcitx5 -d --replace</span></span>
<span class="line"><span># 启用通知</span></span>
<span class="line"><span>exec mako</span></span>
<span class="line"><span># 启用 swaybar</span></span>
<span class="line"><span>bar {</span></span>
<span class="line"><span>    swaybar_command waybar</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://paro.one/20210716-full-notes-of-installing-arch-in-2021/" target="_blank" rel="noreferrer">2021 年的 Arch 安装完全笔记：从选择镜像到个性化</a>，Sway 中 VSCode 渲染优化</li><li><a href="https://zhangjk98.xyz/migrating-from-kde-to-i3/" target="_blank" rel="noreferrer">从KDE迁移i3，顺便说说Linux桌面和窗口管理器</a>，KDE 问题，i3 问题</li><li><a href="https://nth233.top/posts/2023-02-26-Hyprland%E9%85%8D%E7%BD%AE" target="_blank" rel="noreferrer">Hyprland的配置</a></li><li><a href="https://blog.soulter.top/posts/arch-linux-hyprland.html" target="_blank" rel="noreferrer">ArchLinux + Hyprland 体验报告</a></li></ul>`,18)]))}const F=a(p,[["render",e]]);export{o as __pageData,F as default};
