import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/Ingredients-slice';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { buns, mains, sauces, loading } = useSelector(
    (state: RootState) => state.ingredients
  );

  const allIngredients = [...buns, ...mains, ...sauces];
  const ingredientData = allIngredients.find((item) => item._id === id);

  useEffect(() => {
    if (!allIngredients.length) dispatch(getIngredients());
  }, [dispatch]);

  if (loading) return <Preloader />;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
