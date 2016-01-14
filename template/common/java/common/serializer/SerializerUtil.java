package com.{{companyName}}.common.serializer;


import com.dyuproject.protostuff.LinkedBuffer;
import com.dyuproject.protostuff.ProtostuffIOUtil;
import com.dyuproject.protostuff.Schema;


/**
 * SerializerUtil
 *
 * @author wushen
 * @date 2015-9-25
 * @since 0.0.1
 */
public class SerializerUtil extends AbstractProtoSerializer
{

    @Override
    protected <T> byte[] serializeInternal(final T source, final Schema<T> schema, final LinkedBuffer buffer) {
        return ProtostuffIOUtil.toByteArray(source, schema, buffer);
    }


    @Override
    protected <T> T deserializeInternal(final byte[] bytes, final T result, final Schema<T> schema) {
        ProtostuffIOUtil.mergeFrom(bytes, result, schema);
        return result;
    }
}
