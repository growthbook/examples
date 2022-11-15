/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';
import {GrowthBook, GrowthBookProvider} from '@growthbook/growthbook-react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {Section} from './components/Section';

// Create a GrowthBook instance
const growthbook = new GrowthBook({
  trackingCallback: (experiment, result) => {
    console.log('Experiment Viewed', {
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

const App = () => {
  const [isReady, setIsReady] = useState(false);

  // Default value. We shouldn't see $999 this unless the GrowthBook SDK fails to initialize
  const [donutPrice, setDonutPrice] = useState<number>(9999);
  const [bannerText, setBannerText] = useState<string>(
    'Placeholder Banner Text',
  );
  const [role, setRole] = useState<'employee' | 'public'>('employee');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Load feature definitions from GrowthBook API
    fetch(
      'https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8',
    )
      .then(res => res.json())
      .then(json => {
        growthbook.setFeatures(json.features);

        setRole('public');
      })
      .catch(e => console.error('Failed to fetch features', e))
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  const evaluateFeatures = useCallback(() => {
    // Fallback value. We shouldn't see $1337 if donut_price is a valid feature
    const evaluatedDonutPrice = growthbook.getFeatureValue('donut_price', 1337);
    if (typeof evaluatedDonutPrice !== 'undefined') {
      setDonutPrice(evaluatedDonutPrice);
    }

    const evaluatedBannerText = growthbook.getFeatureValue('banner_text', '');
    if (typeof evaluatedBannerText !== 'undefined') {
      setBannerText(evaluatedBannerText);
    }
  }, []);

  const performChangeRole = useCallback(
    (changedRole: 'employee' | 'public') => {
      setRole(changedRole);

      if (changedRole === 'employee') {
        growthbook.setAttributes({
          loggedIn: true,
          country: 'canada',
          employee: true,
          id: 'user-employee-123456789',
        });
      }

      if (changedRole === 'public') {
        growthbook.setAttributes({
          loggedIn: true,
          country: 'spain',
          employee: false,
          id: 'user-abc123',
        });
      }

      evaluateFeatures();
    },
    [evaluateFeatures],
  );

  useEffect(() => {
    if (!isReady) {
      return;
    }

    evaluateFeatures();
  }, [evaluateFeatures, isReady]);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="GrowthBook example">
              This is a <Text style={styles.highlight}>React Native</Text>{' '}
              example implementation of the GrowthBook React SDK.
            </Section>
            {isReady && (
              <>
                <Section title={bannerText}>
                  Role = {role} - Your price for donuts:{' '}
                  <Text style={styles.highlight}>${donutPrice.toFixed(2)}</Text>
                </Section>
                <View style={styles.buttonSection}>
                  <Button
                    title="Public"
                    onPress={() => performChangeRole('public')}
                  />
                  <Button
                    title="Employee"
                    onPress={() => performChangeRole('employee')}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GrowthBookProvider>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  buttonSection: {
    marginTop: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;
