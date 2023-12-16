import tensorflow as tf
import pathlib
import os
from tensorflow import keras
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.python.keras import regularizers
train_gen = ImageDataGenerator(
      rescale=1./255,
      rotation_range=40,
      width_shift_range=0.2,
      height_shift_range=0.2,
      shear_range=0.2,
      zoom_range=0.2,
      horizontal_flip=True,
      fill_mode='nearest')
test_gen  = ImageDataGenerator(rescale = 1.0/255.)
x_train = pathlib.Path("../hotdog-nothotdog/train")
x_test = pathlib.Path("../hotdog-nothotdog/test")
train_ds = train_gen.flow_from_directory(x_train,
                                                    batch_size=20,
                                                    class_mode='binary',
                                                    target_size=(299, 299))     
test_ds =  test_gen.flow_from_directory(x_test,
                                                    batch_size=20,
                                                    class_mode='binary',
                                                    target_size=(299, 299))   

model = tf.keras.models.Sequential([
  tf.keras.layers.Input(shape=(299, 299,3)),
  tf.keras.layers.Conv2D(32,(3,3), activation = 'relu'),
  tf.keras.layers.MaxPooling2D((2,2)),
  tf.keras.layers.Conv2D(64,(3,3), activation = 'relu'),
  tf.keras.layers.MaxPooling2D((2,2)),
  tf.keras.layers.Conv2D(128,(3,3), activation = 'relu'),
  tf.keras.layers.MaxPooling2D((2,2)),
  tf.keras.layers.Flatten(),
  tf.keras.layers.Dense(150, activation='relu',kernel_regularizer=regularizers.l2(0.01),),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(1,activation="sigmoid")
])
model.summary()
model.compile(optimizer='adam',
              loss=tf.keras.losses.BinaryCrossentropy(from_logits=True),
              metrics=['accuracy'])
model.fit(train_ds, validation_data=test_ds, epochs=30)

#transfer learning from pre trained model
base_model = keras.applications.Xception(
    weights='imagenet',
    input_shape=(300, 300, 3),
    include_top=False)
base_model.trainable = False

inputs = keras.Input(shape=(299, 299, 3))

x = base_model(inputs, training=False)

# Convert features of shape `base_model.output_shape[1:]` to vectors
x = keras.layers.GlobalAveragePooling2D()(x)

# A Dense classifier with a single unit (binary classification)
outputs = keras.layers.Dense(1, activation = 'sigmoid')(x)
model = keras.Model(inputs, outputs)

model.compile(optimizer=keras.optimizers.Adam(),
              loss=keras.losses.BinaryCrossentropy(from_logits=True),
              metrics=[keras.metrics.BinaryAccuracy()])


report = model.fit(train_ds, epochs=15, validation_data=test_ds)


model.save('my_model.keras')