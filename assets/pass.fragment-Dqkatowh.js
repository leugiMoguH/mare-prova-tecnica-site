import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";var r,i,a;function o(){return(o=e((()=>{t(),r=`passPixelShader`,i=`varying vec2 vUV;uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=texture2D(textureSampler,vUV);}`,n.ShadersStore[r]||(n.ShadersStore[r]=i),a={name:r,shader:i}})))()}o();export{a as passPixelShader};