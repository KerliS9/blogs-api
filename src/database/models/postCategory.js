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
        foreignKey: 'postId', // primaryKey da PostCategory que também é primaryKey na BlogPost
        otherKey: 'categoryId', // vem da migrations, onde define que conectaria entre as categorias e o PostCategory
        as: 'categories'
    });

    models.Category.belongsToMany(models.BlogPost, {
        through: PostCategory,
        foreignKey: "categoryId", // primaryKey da PostCategory que também é primaryKey na Category
        otherKey: "postId", // vem da migrations, onde define que conectaria entre as BlogPost e o PostCategory
        as: 'blogPosts'
    });
  }

  return PostCategory;
};