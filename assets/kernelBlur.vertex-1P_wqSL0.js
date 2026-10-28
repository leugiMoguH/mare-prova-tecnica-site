import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{n as r,t as i}from"./kernelBlurVaryingDeclaration-BQBjFpOt.js";var a,o,s;function c(){return(c=e((()=>{t(),a=`kernelBlurVertex`,o=`sampleCoord{X}=sampleCenter+delta*KERNEL_OFFSET{X};`,n.IncludesShadersStore[a]||(n.IncludesShadersStore[a]=o),s={name:a,shader:o}})))()}var l,u,d,f;function p(){return(p=e((()=>{t(),i(),c(),l=`kernelBlurVertexShader`,u=`attribute vec2 position;uniform vec2 delta;varying vec2 sampleCenter;
#include<kernelBlurVaryingDeclaration>[0..varyingCount]
const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
sampleCenter=(position*madd+madd);
#include<kernelBlurVertex>[0..varyingCount]
gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`,n.ShadersStore[l]||(n.ShadersStore[l]=u),d=[r,s];for(let e of d)n.IncludesShadersStore[e.name]||(n.IncludesShadersStore[e.name]=e.shader);f={name:l,shader:u}})))()}p();export{f as kernelBlurVertexShader};