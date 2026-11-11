# AB-M01-01 – Caza de alucinaciones

**Fecha de entrega:** 11/11/2026  
**Herramienta evaluada:** GitHub Copilot  
**API:** Swagger Petstore – OpenAPI 3.0.4  
**Fuente de verificación:** `petstore-openapi.json`

## Objetivo

Evaluar la confiabilidad de las respuestas generadas por Copilot mediante la comparación de afirmaciones técnicas con la especificación OpenAPI de Swagger Petstore.

## Metodología

1. Se realizó una consulta a Copilot sobre los endpoints de órdenes, el esquema Order y los códigos HTTP.
2. Se seleccionaron 10 afirmaciones concretas de su respuesta.
3. Se verificó cada afirmación mediante búsquedas y revisión de propiedades en el archivo JSON.
4. Se clasificaron los resultados como Verdadera, Inventada o Media verdad.

## Resultados

| # | Afirmación del modelo | Qué dice la spec (ruta JSON) | Clasificación | Cómo lo verifiqué |
|---|---|---|---|---|
| 1 | Existe POST /store/order | paths./store/order.post | Verdadera | Búsqueda de /store/order |
| 2 | Existe GET /store/order/{orderId} | paths./store/order/{orderId}.get | Verdadera | Revisión del método get |
| 3 | Existe DELETE /store/order/{orderId} | paths./store/order/{orderId}.delete | Verdadera | Revisión del método delete |
| 4 | Order.id es integer, int64 | components.schemas.Order.properties.id | Verdadera | Comparación de type y format |
| 5 | Order.petId es integer, int64 | components.schemas.Order.properties.petId | Verdadera | Comparación de type y format |
| 6 | Order.quantity es integer, int32 | components.schemas.Order.properties.quantity | Verdadera | Comparación de type y format |
| 7 | Order.status admite placed, approved, delivered | components.schemas.Order.properties.status.enum | Verdadera | Comparación de valores enum |
| 8 | Order.complete es boolean | components.schemas.Order.properties.complete | Verdadera | Revisión de type |
| 9 | POST /store/order declara 422 | paths./store/order.post.responses.422 | Verdadera | Revisión de respuestas HTTP |
| 10 | DELETE /store/order/{orderId} declara 404 | paths./store/order/{orderId}.delete.responses.404 | Verdadera | Revisión de respuestas HTTP |

## Resumen

- Afirmaciones analizadas: 10
- Verdaderas: 10
- Inventadas: 0
- Medias verdades: 0
- Confiabilidad de la muestra: 100%

## Conclusión

De las 10 afirmaciones analizadas, las 10 fueron verdaderas y coincidieron con la especificación OpenAPI 3.0.4.

No se detectaron afirmaciones inventadas ni medias verdades, por lo que no hubo un tipo de error predominante.

La verificación demuestra que, aunque Copilot respondió correctamente en este caso, es necesario contrastar sus respuestas con la documentación oficial.