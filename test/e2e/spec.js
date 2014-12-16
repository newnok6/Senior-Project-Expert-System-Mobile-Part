describe('angularjs homepage', function() {
  it('should add one and two', function() {
    browser.get('http://localhost:8100/#/base/substance/showSubstance');
   	element(by.id('goSubstance')).click();
  });
});