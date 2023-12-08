import tensorflow as tf
import pathlib
import os
new_model = tf.keras.models.load_model('model_after.keras')
# Show the model architecture
new_model.summary()
x_train = pathlib.Path("/content/hotdog-nothotdog/train/hotdog/101.jpg")
img = tf.keras.preprocessing.image.load_img(x_train, target_size=(300,300))
img_array = tf.keras.preprocessing.image.img_to_array(img)
img_array = tf.expand_dims(img_array, 0)
print(img_array.shape)
predict = new_model.predict(img_array/255)
print(predict)
