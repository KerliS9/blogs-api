module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    /* id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    postId: DataTypes.STRING,
    categoryId: DataTypes.STRING, */
  },
  {
    timestamps: false,
    tableName: 'PostCategories',
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'id',
        as: 'categories'
    });

    models.Category.belongsToMany(models.BlogPost, {
        through: PostCategory,
        foreignKey: "categoryId",
        otherKey: "id", // o que é esta linha?
        as: 'blogPosts'
    });
  }

  return PostCategory;
};