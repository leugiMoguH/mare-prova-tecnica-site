import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{ct as r,it as i,lt as a,mt as o,pt as s,rt as c,st as l,ut as u}from"./babylon-j47pSUdg.js";var d,f,p,m;function h(){return(h=e((()=>{t(),o(),u(),r(),i(),d=`colorPixelShader`,f=`#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
#define VERTEXCOLOR
varying vec4 vColor;
#else
uniform vec4 color;
#endif
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
gl_FragColor=vColor;
#else
gl_FragColor=color;
#endif
#include<fogFragment>(color,gl_FragColor)
#define CUSTOM_FRAGMENT_MAIN_END
}`,n.ShadersStore[d]||(n.ShadersStore[d]=f),p=[s,a,l,c];for(let e of p)n.IncludesShadersStore[e.name]||(n.IncludesShadersStore[e.name]=e.shader);m={name:d,shader:f}})))()}h();export{m as colorPixelShader};