import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{i as r,n as i,r as a,t as o}from"./clipPlaneFragment-Dc7MhVQM.js";import{i as s,n as c,r as l,t as u}from"./fogFragment-DeYIfNuN.js";var d,f,p,m;function h(){return(h=e((()=>{t(),r(),s(),i(),c(),d=`colorPixelShader`,f=`#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
#define VERTEXCOLOR
varying vColor: vec4f;
#else
uniform color: vec4f;
#endif
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
fragmentOutputs.color=input.vColor;
#else
fragmentOutputs.color=uniforms.color;
#endif
#include<fogFragment>(color,fragmentOutputs.color)
#define CUSTOM_FRAGMENT_MAIN_END
}`,n.ShadersStoreWGSL[d]||(n.ShadersStoreWGSL[d]=f),p=[a,l,o,u];for(let e of p)n.IncludesShadersStoreWGSL[e.name]||(n.IncludesShadersStoreWGSL[e.name]=e.shader);m={name:d,shader:f}})))()}h();export{m as colorPixelShaderWGSL};