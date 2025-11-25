import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesNestedController } from './categories/categories-nested.controller';
import { CategoriesService } from './categories/categories.service';
import { FeaturesController } from './features/features.controller';
import { FeaturesCategoryController } from './features/features-category.controller';
import { FeaturesService } from './features/features.service';
import { FeatureValuesController } from './feature-values/feature-values.controller';
import { FeatureValuesNestedController } from './feature-values/feature-values-nested.controller';
import { FeatureValuesService } from './feature-values/feature-values.service';
import { ValueTypesController } from './value-types/value-types.controller';
import { ValueTypesService } from './value-types/value-types.service';
import { HttpClientModule } from '../common/services/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [
    ResourcesController,
    CategoriesController,
    CategoriesNestedController,
    FeaturesController,
    FeaturesCategoryController,
    FeatureValuesController,
    FeatureValuesNestedController,
    ValueTypesController,
  ],
  providers: [
    ResourcesService,
    CategoriesService,
    FeaturesService,
    FeatureValuesService,
    ValueTypesService,
  ],
})
export class ResourcesModule {}

