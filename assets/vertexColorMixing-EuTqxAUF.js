import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";var r,i,a;function o(){return(o=e((()=>{t(),r=`fogVertexDeclaration`,i=`#ifdef FOG
varying vec3 vFogDistance;
#endif
`,n.IncludesShadersStore[r]||(n.IncludesShadersStore[r]=i),a={name:r,shader:i}})))()}var s,c,l;function u(){return(u=e((()=>{t(),s=`fogVertex`,c=`#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`,n.IncludesShadersStore[s]||(n.IncludesShadersStore[s]=c),l={name:s,shader:c}})))()}var d,f,p;function m(){return(m=e((()=>{t(),d=`vertexColorMixing`,f=`#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
vColor=vec4(1.0);
#ifdef VERTEXCOLOR
#ifdef VERTEXALPHA
vColor*=colorUpdated;
#else
vColor.rgb*=colorUpdated.rgb;
#endif
#endif
#ifdef INSTANCESCOLOR
vColor*=instanceColor;
#endif
#endif
`,n.IncludesShadersStore[d]||(n.IncludesShadersStore[d]=f),p={name:d,shader:f}})))()}export{a,u as i,p as n,o,l as r,m as t};