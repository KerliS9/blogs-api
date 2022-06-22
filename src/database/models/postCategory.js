module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
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
        foreignKey: "categoryId", // foreignKey da tabela PostCategory que é a primaryKey da Category
        otherKey: "id", // primaryKey da tabela BlogPost
        as: 'blogPosts'
    });
  }

  return PostCategory;
};